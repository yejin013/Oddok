package com.oddok.server.common.config;

import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
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
    private StudyRoomService studyRoomService;

    @Bean
    public Job job() {
        return jobBuilderFactory.get("job").start(step()).build();
    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step").tasklet((contribution, chunkContext) -> {
            List<StudyRoomDto> studyRoomDtos = studyRoomService.getAllStudyRoom();

            for(StudyRoomDto studyRoomDto : studyRoomDtos) {
                studyRoomService.deleteStudyRoom(studyRoomDto.getId());
            }

            return RepeatStatus.FINISHED;
        }).build();
    }
}
