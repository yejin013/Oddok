package com.oddok.server.common.config;

import com.oddok.server.domain.timerecord.application.TimeRecordService;
import com.oddok.server.domain.timerecord.dto.TimeRecordDto;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@EnableBatchProcessing
public class BatchConfig {
    @Autowired
    public JobBuilderFactory jobBuilderFactory;
    @Autowired
    public StepBuilderFactory stepBuilderFactory;
    @Autowired
    private TimeRecordService timeRecordService;

    @Bean
    public Job job() {
        return jobBuilderFactory.get("job").start(step()).build();
    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step").tasklet((contribution, chunkContext) -> {
            List<TimeRecordDto> timeRecords = timeRecordService.get();

            for(TimeRecordDto timeRecord : timeRecords) {
                timeRecordService.delete(timeRecord.getId());
            }

            return RepeatStatus.FINISHED;
        }).build();
    }
}
