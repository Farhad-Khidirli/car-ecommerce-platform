package az.marketplace.api.identity;

import az.marketplace.api.identity.AuthRequests.LoginRequest;
import az.marketplace.api.identity.AuthRequests.RegisterRequest;
import az.marketplace.api.identity.AuthResponses.AuthResponse;
import az.marketplace.api.identity.AuthResponses.UserResponse;
import java.time.OffsetDateTime;
import java.util.Locale;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthTokenRepository authTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, AuthTokenRepository authTokenRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authTokenRepository = authTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        String phone = normalize(request.phone());

        if (email != null && userRepository.findByEmailIgnoreCase(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        if (phone != null && userRepository.findByPhone(phone).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone is already registered");
        }

        UserAccount user = new UserAccount(
            UUID.randomUUID(),
            email,
            phone,
            request.displayName().trim(),
            passwordEncoder.encode(request.password()),
            UserRole.USER
        );
        userRepository.save(user);
        return issueToken(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String identifier = normalize(request.identifier());
        UserAccount user = resolveUser(identifier);
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login credentials");
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not active");
        }
        return issueToken(user);
    }

    private UserAccount resolveUser(String identifier) {
        if (identifier != null && identifier.contains("@")) {
            return userRepository.findByEmailIgnoreCase(identifier)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login credentials"));
        }
        return userRepository.findByPhone(identifier)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login credentials"));
    }

    private AuthResponse issueToken(UserAccount user) {
        String token = UUID.randomUUID() + "." + UUID.randomUUID();
        OffsetDateTime expiresAt = OffsetDateTime.now().plusDays(14);
        authTokenRepository.save(new AuthToken(UUID.randomUUID(), user, token, expiresAt));
        return new AuthResponse(token, expiresAt, UserResponse.from(user));
    }

    private String normalizeEmail(String value) {
        String normalized = normalize(value);
        return normalized == null ? null : normalized.toLowerCase(Locale.ROOT);
    }

    private String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
