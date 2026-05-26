package az.marketplace.api.identity;

import java.time.OffsetDateTime;
import java.util.UUID;

public final class AuthResponses {

    private AuthResponses() {
    }

    public record UserResponse(UUID id, String email, String phone, String displayName, UserRole role) {
        public static UserResponse from(UserAccount user) {
            return new UserResponse(user.getId(), user.getEmail(), user.getPhone(), user.getDisplayName(), user.getRole());
        }
    }

    public record AuthResponse(String token, OffsetDateTime expiresAt, UserResponse user) {
    }
}
