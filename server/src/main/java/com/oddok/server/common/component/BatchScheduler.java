package com.oddok.server.common.component;

import com.oddok.server.common.config.BatchConfig;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class BatchScheduler {

    @Autowired
    private JobLauncher jobLauncher;
    @Autowired
    private BatchConfig batchConfig;

    @Scheduled(cron = "0 0 9 * * 7") // 일요일 아침 9시 정각 0초
    public void runJob() {
        // job parameter 설정
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(batchConfig.job(), jobParameters);
        } catch (JobExecutionAlreadyRunningException | JobInstanceAlreadyCompleteException
            | JobParametersInvalidException | org.springframework.batch.core.repository.JobRestartException e) {
            System.out.println(e.getMessage());
        }
    }
}
