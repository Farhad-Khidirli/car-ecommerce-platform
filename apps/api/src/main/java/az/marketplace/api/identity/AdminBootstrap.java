package az.marketplace.api.identity;

import az.marketplace.api.listings.Listing;
import az.marketplace.api.listings.ListingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrap implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final String adminEmail;
    private final String adminPassword;

    public AdminBootstrap(
        UserRepository userRepository,
        ListingRepository listingRepository,
        PasswordEncoder passwordEncoder,
        ObjectMapper objectMapper,
        @Value("${marketplace.admin.email:admin@example.com}") String adminEmail,
        @Value("${marketplace.admin.password:admin12345}") String adminPassword
    ) {
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        ensureUser(adminEmail, null, "Marketplace Admin", adminPassword, UserRole.ADMIN);
        ensureUser(null, "admin", "Demo Admin", "admin", UserRole.ADMIN);
        UserAccount demoUser = ensureUser("demo@demo.com", null, "Demo User", "demo123", UserRole.USER);

        seedDemoListings(demoUser);
    }

    private UserAccount ensureUser(String email, String phone, String displayName, String password, UserRole role) {
        if (email != null && userRepository.findByEmailIgnoreCase(email).isPresent()) {
            return userRepository.findByEmailIgnoreCase(email).orElseThrow();
        }
        if (phone != null && userRepository.findByPhone(phone).isPresent()) {
            return userRepository.findByPhone(phone).orElseThrow();
        }
        return userRepository.save(new UserAccount(
            UUID.randomUUID(),
            email,
            phone,
            displayName,
            passwordEncoder.encode(password),
            role
        ));
    }

    private void seedDemoListings(UserAccount seller) {
        seedListing(
            seller,
            "vehicles",
            "Mercedes-Benz C 300 AMG",
            "Clean sedan with panoramic roof, service history, and fresh inspection.",
            "49800",
            "DEALER",
            Map.of(
                "Brand", "Mercedes-Benz",
                "Model", "C-Class",
                "Year", "2021",
                "Mileage", "39,000 km",
                "Engine", "2.0L petrol",
                "Transmission", "Automatic",
                "Body", "Sedan",
                "Color", "Graphite",
                "Location", "Baku"
            ),
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
            "Baku Auto Gallery",
            "+994 50 555 20 20"
        );
        seedListing(
            seller,
            "vehicles",
            "Toyota Land Cruiser Prado",
            "Family SUV with 4x4 package, leather interior, and parking cameras.",
            "62500",
            "FEATURED",
            Map.of(
                "Brand", "Toyota",
                "Model", "Land Cruiser Prado",
                "Year", "2019",
                "Mileage", "84,000 km",
                "Drivetrain", "4x4",
                "Seats", "7",
                "Fuel", "Petrol",
                "Customs", "Cleared",
                "Location", "Ganja"
            ),
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
            "Private seller",
            "+994 55 410 11 80"
        );
        seedListing(
            seller,
            "vehicles",
            "BMW R nineT Pure",
            "Weekend motorcycle with low mileage and tasteful accessories.",
            "18900",
            "NEW",
            Map.of(
                "Brand", "BMW",
                "Model", "R nineT",
                "Year", "2022",
                "Mileage", "7,400 km",
                "Engine", "1170 cc",
                "Condition", "Excellent",
                "Documents", "Ready",
                "Location", "Sumgayit"
            ),
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
            "Moto House",
            "+994 70 300 45 90"
        );
        seedListing(
            seller,
            "real-estate",
            "Sea-view apartment near Boulevard",
            "Bright apartment with balcony, underground parking, and modern renovation.",
            "285000",
            "SALE",
            Map.of(
                "Rooms", "3",
                "Area", "128 m2",
                "Floor", "12 / 18",
                "Repair", "Modern",
                "Building", "New build",
                "Parking", "Underground",
                "Location", "Baku, Sabail"
            ),
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
            "Caspian Property",
            "+994 12 440 30 10"
        );
        seedListing(
            seller,
            "goods",
            "iPhone 15 Pro Max 256 GB",
            "Excellent condition phone with box, cable, and battery health shown.",
            "2450",
            "USED",
            Map.of(
                "Storage", "256 GB",
                "Color", "Natural titanium",
                "Battery", "94%",
                "Warranty", "6 months",
                "Box", "Included",
                "Condition", "Excellent",
                "Location", "Baku"
            ),
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
            "Farid Gadgets",
            "+994 55 777 11 22"
        );
    }

    private void seedListing(
        UserAccount seller,
        String categoryKey,
        String title,
        String description,
        String priceAmount,
        String listingType,
        Map<String, String> parameters,
        String imageUrl,
        String contactName,
        String contactPhone
    ) {
        if (listingRepository.existsByTitle(title)) {
            return;
        }
        try {
            Listing listing = new Listing(UUID.randomUUID(), seller);
            listing.updateDetails(
                categoryKey,
                title,
                description,
                new BigDecimal(priceAmount),
                "AZN",
                listingType,
                objectMapper.writeValueAsString(parameters),
                imageUrl,
                contactName,
                contactPhone
            );
            listingRepository.save(listing);
        } catch (Exception e) {
            throw new IllegalStateException("Could not seed demo listing " + title, e);
        }
    }
}
