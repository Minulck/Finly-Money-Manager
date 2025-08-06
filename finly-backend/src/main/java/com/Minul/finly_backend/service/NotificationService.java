package com.Minul.finly_backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.Minul.finly_backend.dto.ExpenseDTO;
import com.Minul.finly_backend.entity.ProfileEntity;
import com.Minul.finly_backend.repository.ProfileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final ProfileService profileService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;
    private final EmailService emailService;
    private final ProfileRepository profileRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 20 15 * * *", zone = "Asia/Colombo")
    public void sendDailyIncomeExpenseReminder(){
        log.info("Sending daily income and expense reminder email to all users");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile : profiles){
            log.info("Sending reminder to: {}", profile.getEmail());
            String body = """
                    <h1>Daily Income and Expense Reminder</h1>
                    <p>Dear %s,</p>
                    <p>This is a reminder to check your daily income and expenses.</p>
                    <p>You can view your income and expenses by clicking the button below:</p>
                    <a href="%s" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Visit Profile</a>
                    <p>Thank you for using our service!</p>
                    """.formatted(profile.getFullName(), frontendUrl);
            emailService.sendMail(
                    profile.getEmail(),
                    "Daily Income and Expense Reminder",
                    body
            );
        }
        log.info("Daily income and expense reminder email sent to all users");
    }

    @Scheduled(cron = "0 30 15 * * *", zone = "Asia/Colombo")
    public void sendDailyExpenseSummary() {
        log.info("Sending daily expense summary email to all users");
        List<ProfileEntity> profiles = profileRepository.findAll();

        for (ProfileEntity profile : profiles) {
            log.info("Processing profile: {}", profile.getEmail());
            List<ExpenseDTO> todayExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());
            if (!todayExpenses.isEmpty()) {
                log.info("Preparing summary for: {}", profile.getEmail());

                BigDecimal total = todayExpenses.stream()
                        .map(ExpenseDTO::getAmount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

                StringBuilder table = new StringBuilder();
                table.append("<table style=\"width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;\">")
                        .append("<thead><tr style=\"background-color: #f2f2f2;\">")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">#</th>")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">Icon</th>")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">Expense</th>")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">Category</th>")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">Amount</th>")
                        .append("<th style=\"border: 1px solid #ddd; padding: 12px;\">Date</th>")
                        .append("</tr></thead>");

                int index = 1;
                for (ExpenseDTO expense : todayExpenses) {
                    log.info("Expense: {}, Amount: {}, Date: {}", expense.getCategoryName(), expense.getAmount(), expense.getDate());
                    table.append("<tr>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\">").append(index++).append("</td>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\"><img src=\"").append(expense.getIcon()).append("\" style=\"width: 20px; height: 20px;\"></td>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\">").append(expense.getName()).append("</td>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\">").append(expense.getCategoryName()).append("</td>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\">").append(expense.getAmount()).append("</td>")
                            .append("<td style=\"border: 1px solid #ddd; padding: 12px;\">").append(expense.getDate()).append("</td>")
                            .append("</tr>");
                }
                table.append("</table>");

                String body = """
                <h1>Daily Expense Summary</h1>
                <p>Dear %s,</p><br><br>
                <p>Here is your daily expense summary for %s:</p><br><br>
                %s
                <br><br><p>Total Expenses: %s </p>
                <br><br><p>Thank you for using our service!</p>
                """.formatted(profile.getFullName(), LocalDate.now(), table.toString(), total);

                emailService.sendMail(profile.getEmail(), "Daily Expense Summary", body);
            }
        }

        log.info("Daily expense summary email sent to all users");
    }

}
