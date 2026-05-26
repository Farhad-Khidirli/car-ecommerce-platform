package az.marketplace.api.listings;

import az.marketplace.api.identity.AuthenticatedUser;
import az.marketplace.api.identity.UserAccount;
import az.marketplace.api.identity.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ListingService(ListingRepository listingRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<ListingResponse> publicListings() {
        return listingRepository.findByStatusOrderByCreatedAtDesc(ListingStatus.PUBLISHED)
            .stream()
            .map(listing -> ListingResponse.from(listing, objectMapper))
            .toList();
    }

    @Transactional(readOnly = true)
    public ListingResponse publicListing(UUID id) {
        Listing listing = listingRepository.findById(id)
            .filter(item -> item.getStatus() == ListingStatus.PUBLISHED)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        return ListingResponse.from(listing, objectMapper);
    }

    @Transactional(readOnly = true)
    public List<ListingResponse> myListings(AuthenticatedUser user) {
        return listingRepository.findBySellerIdOrderByCreatedAtDesc(user.id())
            .stream()
            .map(listing -> ListingResponse.from(listing, objectMapper))
            .toList();
    }

    @Transactional
    public ListingResponse create(AuthenticatedUser principal, ListingRequests.ListingUpsertRequest request) {
        UserAccount seller = userRepository.findById(principal.id()).orElseThrow();
        Listing listing = new Listing(UUID.randomUUID(), seller);
        apply(listing, request);
        return ListingResponse.from(listingRepository.save(listing), objectMapper);
    }

    @Transactional
    public ListingResponse update(AuthenticatedUser principal, UUID id, ListingRequests.ListingUpsertRequest request) {
        Listing listing = listingRepository.findByIdAndSellerId(id, principal.id())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        apply(listing, request);
        return ListingResponse.from(listing, objectMapper);
    }

    @Transactional
    public void delete(AuthenticatedUser principal, UUID id) {
        Listing listing = listingRepository.findByIdAndSellerId(id, principal.id())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        listingRepository.delete(listing);
    }

    @Transactional(readOnly = true)
    public List<ListingResponse> adminListings() {
        return listingRepository.findAll()
            .stream()
            .map(listing -> ListingResponse.from(listing, objectMapper))
            .toList();
    }

    @Transactional
    public ListingResponse moderate(AuthenticatedUser admin, UUID id, ListingRequests.ModerationRequest request) {
        if (request.status() != ListingStatus.FROZEN && request.status() != ListingStatus.HIDDEN && request.status() != ListingStatus.PUBLISHED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admin can publish, freeze, or hide a listing");
        }
        Listing listing = listingRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        listing.moderate(request.status(), request.message(), admin.id());
        return ListingResponse.from(listing, objectMapper);
    }

    private void apply(Listing listing, ListingRequests.ListingUpsertRequest request) {
        listing.updateDetails(
            request.categoryKey().trim(),
            request.title().trim(),
            request.description(),
            request.priceAmount(),
            request.priceCurrency().trim().toUpperCase(),
            request.listingType().trim().toUpperCase(),
            writeParameters(request.parameters()),
            request.imageUrl(),
            request.contactName(),
            request.contactPhone()
        );
    }

    private String writeParameters(Map<String, String> parameters) {
        try {
            return objectMapper.writeValueAsString(parameters == null ? Map.of() : parameters);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid listing parameters");
        }
    }
}
