package az.marketplace.api.listings;

import az.marketplace.api.common.ApiResponse;
import az.marketplace.api.identity.AuthenticatedUser;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/api/listings")
    public ApiResponse<List<ListingResponse>> publicListings() {
        return new ApiResponse<>(listingService.publicListings());
    }

    @GetMapping("/api/listings/{id}")
    public ApiResponse<ListingResponse> publicListing(@PathVariable UUID id) {
        return new ApiResponse<>(listingService.publicListing(id));
    }

    @GetMapping("/api/me/listings")
    public ApiResponse<List<ListingResponse>> myListings(@AuthenticationPrincipal AuthenticatedUser principal) {
        return new ApiResponse<>(listingService.myListings(principal));
    }

    @PostMapping("/api/me/listings")
    public ApiResponse<ListingResponse> create(
        @AuthenticationPrincipal AuthenticatedUser principal,
        @Valid @RequestBody ListingRequests.ListingUpsertRequest request
    ) {
        return new ApiResponse<>(listingService.create(principal, request));
    }

    @PutMapping("/api/me/listings/{id}")
    public ApiResponse<ListingResponse> update(
        @AuthenticationPrincipal AuthenticatedUser principal,
        @PathVariable UUID id,
        @Valid @RequestBody ListingRequests.ListingUpsertRequest request
    ) {
        return new ApiResponse<>(listingService.update(principal, id, request));
    }

    @DeleteMapping("/api/me/listings/{id}")
    public void delete(@AuthenticationPrincipal AuthenticatedUser principal, @PathVariable UUID id) {
        listingService.delete(principal, id);
    }

    @GetMapping("/api/admin/listings")
    public ApiResponse<List<ListingResponse>> adminListings() {
        return new ApiResponse<>(listingService.adminListings());
    }

    @PostMapping("/api/admin/listings/{id}/moderation")
    public ApiResponse<ListingResponse> moderate(
        @AuthenticationPrincipal AuthenticatedUser principal,
        @PathVariable UUID id,
        @Valid @RequestBody ListingRequests.ModerationRequest request
    ) {
        return new ApiResponse<>(listingService.moderate(principal, id, request));
    }
}
