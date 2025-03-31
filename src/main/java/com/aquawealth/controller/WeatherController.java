package com.aquawealth.controller;

import com.aquawealth.util.WeatherAPIUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aquawealth.service.WeatherService;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private WeatherAPIUtil weatherAPIUtil;


    @GetMapping("/risk")
    public String getWeatherRisk(@RequestParam String city, @RequestParam String date) {
        return weatherAPIUtil.checkWeatherRisk(city, date);
    }
    @GetMapping("/{city}")
    public String getWeather(@PathVariable String city, @RequestParam String date) {
        return weatherAPIUtil.getWeather(city, date);
    }

    private final WeatherService weatherService;
    @Autowired
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @PostMapping("/update/{city}")
    public String updateWeather(@PathVariable String city) {
        weatherService.updateWeatherForCity(city);
        return "Weather data updated successfully for: " + city;
    }

}
