package az.marketplace.api.identity;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthRequests {

    private AuthRequests() {
    }

    public record RegisterRequest(
        String email,
        String phone,
        @NotBlank @Size(min = 2, max = 160) String displayName,
        @NotBlank @Size(min = 8, max = 120) String password
    ) {
        @AssertTrue(message = "Email or phone is required")
        public boolean hasContact() {
            return (email != null && !email.isBlank()) || (phone != null && !phone.isBlank());
        }
    }

    public record LoginRequest(
        @NotBlank String identifier,
        @NotBlank String password
    ) {
    }
}
