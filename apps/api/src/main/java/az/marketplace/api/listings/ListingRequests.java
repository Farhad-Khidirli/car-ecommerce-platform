package az.marketplace.api.listings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Map;

public final class ListingRequests {

    private ListingRequests() {
    }

    public record ListingUpsertRequest(
        @NotBlank @Size(max = 80) String categoryKey,
        @NotBlank @Size(max = 220) String title,
        @Size(max = 5000) String description,
        @NotNull BigDecimal priceAmount,
        @NotBlank @Size(min = 3, max = 3) String priceCurrency,
        @NotBlank @Size(max = 40) String listingType,
        @Size(max = 1000) String imageUrl,
        @Size(max = 160) String contactName,
        @Size(max = 64) String contactPhone,
        Map<String, String> parameters
    ) {
    }

    public record ModerationRequest(
        @NotNull ListingStatus status,
        @NotBlank @Size(max = 1200) String message
    ) {
    }
}
