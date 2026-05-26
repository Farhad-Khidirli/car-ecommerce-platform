package az.marketplace.api.identity;

import java.util.UUID;

public record AuthenticatedUser(UUID id, String displayName, UserRole role) {
}
