package az.marketplace.api.listings;

import az.marketplace.api.identity.UserAccount;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "listing")
public class Listing {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private UserAccount seller;

    @Column(name = "category_key", length = 80)
    private String categoryKey;

    @Column(length = 220)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "price_amount")
    private BigDecimal priceAmount;

    @Column(name = "price_currency", columnDefinition = "char(3)")
    private String priceCurrency = "AZN";

    @Enumerated(EnumType.STRING)
    @Column(length = 40)
    private ListingStatus status = ListingStatus.PUBLISHED;

    @Column(name = "listing_type", length = 40)
    private String listingType;

    @Column(name = "parameters_json", columnDefinition = "text")
    private String parametersJson;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(name = "contact_name", length = 160)
    private String contactName;

    @Column(name = "contact_phone", length = 64)
    private String contactPhone;

    @Column(name = "moderation_message", columnDefinition = "text")
    private String moderationMessage;

    @Column(name = "moderated_by")
    private UUID moderatedBy;

    @Column(name = "moderated_at")
    private OffsetDateTime moderatedAt;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    protected Listing() {
    }

    public Listing(UUID id, UserAccount seller) {
        this.id = id;
        this.seller = seller;
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = this.createdAt;
        this.publishedAt = this.createdAt;
    }

    public UUID getId() {
        return id;
    }

    public UserAccount getSeller() {
        return seller;
    }

    public String getCategoryKey() {
        return categoryKey;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPriceAmount() {
        return priceAmount;
    }

    public String getPriceCurrency() {
        return priceCurrency;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public String getListingType() {
        return listingType;
    }

    public String getParametersJson() {
        return parametersJson;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getContactName() {
        return contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public String getModerationMessage() {
        return moderationMessage;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void updateDetails(
        String categoryKey,
        String title,
        String description,
        BigDecimal priceAmount,
        String priceCurrency,
        String listingType,
        String parametersJson,
        String imageUrl,
        String contactName,
        String contactPhone
    ) {
        this.categoryKey = categoryKey;
        this.title = title;
        this.description = description;
        this.priceAmount = priceAmount;
        this.priceCurrency = priceCurrency;
        this.listingType = listingType;
        this.parametersJson = parametersJson;
        this.imageUrl = imageUrl;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.updatedAt = OffsetDateTime.now();
        if (this.status == ListingStatus.DRAFT) {
            this.status = ListingStatus.PUBLISHED;
            this.publishedAt = this.updatedAt;
        }
    }

    public void moderate(ListingStatus status, String message, UUID adminId) {
        this.status = status;
        this.moderationMessage = message;
        this.moderatedBy = adminId;
        this.moderatedAt = OffsetDateTime.now();
        this.updatedAt = this.moderatedAt;
    }
}
