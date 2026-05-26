package az.marketplace.api.listings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

public record ListingResponse(
    UUID id,
    UUID sellerId,
    String sellerName,
    String categoryKey,
    String title,
    String description,
    BigDecimal priceAmount,
    String priceCurrency,
    ListingStatus status,
    String listingType,
    String imageUrl,
    String contactName,
    String contactPhone,
    String moderationMessage,
    Map<String, String> parameters,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    private static final TypeReference<Map<String, String>> PARAMETER_TYPE = new TypeReference<>() {
    };

    public static ListingResponse from(Listing listing, ObjectMapper objectMapper) {
        return new ListingResponse(
            listing.getId(),
            listing.getSeller().getId(),
            listing.getSeller().getDisplayName(),
            listing.getCategoryKey(),
            listing.getTitle(),
            listing.getDescription(),
            listing.getPriceAmount(),
            listing.getPriceCurrency(),
            listing.getStatus(),
            listing.getListingType(),
            listing.getImageUrl(),
            listing.getContactName(),
            listing.getContactPhone(),
            listing.getModerationMessage(),
            readParameters(listing.getParametersJson(), objectMapper),
            listing.getCreatedAt(),
            listing.getUpdatedAt()
        );
    }

    private static Map<String, String> readParameters(String json, ObjectMapper objectMapper) {
        if (json == null || json.isBlank()) {
            return Map.of();
        }
        try {
            return objectMapper.readValue(json, PARAMETER_TYPE);
        } catch (Exception ignored) {
            return Map.of();
        }
    }
}
