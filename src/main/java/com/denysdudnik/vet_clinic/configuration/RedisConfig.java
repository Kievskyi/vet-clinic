package com.denysdudnik.vet_clinic.configuration;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig {

//    @Bean
//    public ObjectMapper redisObjectMapper() {
//        ObjectMapper mapper = new ObjectMapper();
//
//        // Использование BasicPolymorphicTypeValidator вместо deprecated activateDefaultTyping
//        mapper.activateDefaultTyping(
//                BasicPolymorphicTypeValidator.builder()
//                        .allowIfBaseType(Object.class)
//                        .build(),
//                ObjectMapper.DefaultTyping.NON_FINAL,
//                JsonTypeInfo.As.PROPERTY
//        );
//
//        return mapper;
//    }

    /**
     * Конфигурация RedisTemplate с использованием Jackson2JsonRedisSerializer.
     */
    @Bean
    public RedisSerializer<Object> jsonRedisSerializer() {
        ObjectMapper mapper = new ObjectMapper();

        // Создание PolymorphicTypeValidator с ограничением на базовый тип
        BasicPolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator.builder()
                .allowIfSubType("com.denysdudnik.vet_clinic.dto")
                .allowIfSubType("com.denysdudnik.vet_clinic.entity")
                .allowIfSubType("java.util")
                .allowIfSubType("org.hibernate.collection.spi")
                .build();

        // Включение полиморфной типизации только для нефинальных классов
        mapper
                .activateDefaultTyping(
                        ptv,
                        ObjectMapper.DefaultTyping.NON_FINAL,
                        JsonTypeInfo.As.PROPERTY)
                .registerModule(new JavaTimeModule());

        return new Jackson2JsonRedisSerializer<>(mapper, Object.class);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory,
                                                       RedisSerializer<Object> jsonRedisSerializer) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        // Установка сериализаторов
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(jsonRedisSerializer);

        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory,
                                          RedisSerializer<Object> jsonRedisSerializer) {
        // Настройка сериализации ключей и значений кэша
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(jsonRedisSerializer))
                .entryTtl(Duration.ofHours(1)) // Время жизни кэша, можно настроить по необходимости
                .disableCachingNullValues();

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(config)
                .build();
    }
}
