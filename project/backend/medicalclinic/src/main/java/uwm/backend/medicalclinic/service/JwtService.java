package uwm.backend.medicalclinic.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.AeadAlgorithm;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.UserRepository;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final UserRepository userRepository;
    AeadAlgorithm enc = Jwts.ENC.A128CBC_HS256;
    SecretKey secretKey = enc.key().build();

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @Value("$security.jwt.secret-key")
//    private String secretKey;
//

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(
            Map<String, Object> extraClaims,
            String email
    ) {
        String userRole = userRepository.findRoleByUsername(email);
        extraClaims.put("role", userRole);
        return Jwts
                .builder()
                .subject(email)
                .claim(userRole, extraClaims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60000 * 60)) // one hour
                .encryptWith(secretKey,Jwts.ENC.A128CBC_HS256)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

//    private SecretKey getSignInKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
}
