package mk.ukim.finki.wp.backend.web.controller;

import java.util.List;
import mk.ukim.finki.wp.backend.service.StatisticsService;
import mk.ukim.finki.wp.backend.web.dto.PersonalRecordResponse;
import mk.ukim.finki.wp.backend.web.dto.StatisticsSummaryResponse;
import mk.ukim.finki.wp.backend.web.dto.WorkoutHistoryResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/summary")
    public StatisticsSummaryResponse getSummary() {
        return statisticsService.getSummary();
    }

    @GetMapping("/personal-records")
    public List<PersonalRecordResponse> getPersonalRecords() {
        return statisticsService.getPersonalRecords();
    }

    @GetMapping("/workout-history")
    public List<WorkoutHistoryResponse> getWorkoutHistory() {
        return statisticsService.getWorkoutHistory();
    }
}
