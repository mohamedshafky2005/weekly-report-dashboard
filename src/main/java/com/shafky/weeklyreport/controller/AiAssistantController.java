package com.shafky.weeklyreport.controller;

import com.shafky.weeklyreport.dto.AiChatRequest;
import com.shafky.weeklyreport.service.AiAssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody AiChatRequest request) {
        String answer = aiAssistantService.answer(request.getQuestion());
        return Map.of("answer", answer);
    }
}