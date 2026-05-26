package az.marketplace.api.identity;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrap implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public AdminBootstrap(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        @Value("${marketplace.admin.email:admin@example.com}") String adminEmail,
        @Value("${marketplace.admin.password:admin12345}") String adminPassword
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        userRepository.findByEmailIgnoreCase(adminEmail).orElseGet(() ->
            userRepository.save(new UserAccount(
                UUID.randomUUID(),
                adminEmail,
                null,
                "Marketplace Admin",
                passwordEncoder.encode(adminPassword),
                UserRole.ADMIN
            ))
        );
    }
}
