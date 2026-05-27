package az.marketplace.api.listings;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, UUID> {

    List<Listing> findByStatusOrderByCreatedAtDesc(ListingStatus status);

    List<Listing> findByStatusInOrderByCreatedAtDesc(List<ListingStatus> statuses);

    List<Listing> findBySellerIdOrderByCreatedAtDesc(UUID sellerId);

    Optional<Listing> findByIdAndSellerId(UUID id, UUID sellerId);

    boolean existsByTitle(String title);
}
