package az.marketplace.api.identity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "auth_token")
public class AuthToken {

    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount user;

    @Column(nullable = false, unique = true, length = 128)
    private String token;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    private OffsetDateTime expiresAt;

    protected AuthToken() {
    }

    public AuthToken(UUID id, UserAccount user, String token, OffsetDateTime expiresAt) {
        this.id = id;
        this.user = user;
        this.token = token;
        this.createdAt = OffsetDateTime.now();
        this.expiresAt = expiresAt;
    }

    public UserAccount getUser() {
        return user;
    }
}
