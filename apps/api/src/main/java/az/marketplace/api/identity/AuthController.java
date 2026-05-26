package az.marketplace.api.identity;

import az.marketplace.api.common.ApiResponse;
import az.marketplace.api.identity.AuthRequests.LoginRequest;
import az.marketplace.api.identity.AuthRequests.RegisterRequest;
import az.marketplace.api.identity.AuthResponses.AuthResponse;
import az.marketplace.api.identity.AuthResponses.UserResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return new ApiResponse<>(authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return new ApiResponse<>(authService.login(request));
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> me(@AuthenticationPrincipal AuthenticatedUser principal) {
        UserAccount user = userRepository.findById(principal.id()).orElseThrow();
        return new ApiResponse<>(UserResponse.from(user));
    }
}
