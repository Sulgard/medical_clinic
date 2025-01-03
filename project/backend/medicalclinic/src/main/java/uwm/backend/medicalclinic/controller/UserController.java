package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.PasswordChangeRequestDTO;
import uwm.backend.medicalclinic.dto.UpdateConfirmationDTO;
import uwm.backend.medicalclinic.dto.UserInfoDTO;
import uwm.backend.medicalclinic.service.UserService;

@AllArgsConstructor
@RequestMapping("api/users")
@RestController
public class UserController {
    UserService userService;

    @GetMapping("/info/{id}")
    ResponseEntity<?> getUserInfo(@PathVariable Long id) {
        UserInfoDTO user = userService.getUserInfo(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/editPassword/{id}")
    ResponseEntity<UpdateConfirmationDTO> changePassword(@PathVariable("id") Long id, @RequestBody PasswordChangeRequestDTO data) {
        return ResponseEntity.ok(userService.changePassword(id, data));
    }
}
