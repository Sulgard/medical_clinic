package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.dto.UserInfoDTO;
import uwm.backend.medicalclinic.service.UserService;

@AllArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    UserService userService;

    @GetMapping("/info/{id}")
    ResponseEntity<?> getUserInfo(@PathVariable Long id) {
        UserInfoDTO user = userService.getUserInfo(id);
        return ResponseEntity.ok(user);
    }
}
