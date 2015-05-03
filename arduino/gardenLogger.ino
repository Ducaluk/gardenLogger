#include <Wire.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>
#include <ArduinoJson.h>

#define DHTPIN 2
#define DHTTYPE DHT22
int incomingByte = 0; 

DHT dht(DHTPIN, DHTTYPE);
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);

static char strH[15];
static char strT[15];

void setup() {
     Serial.begin(115200); 
     dht.begin();
     tsl.begin();
     tsl.enableAutoRange(true); 
     tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS);
  
}

void loop() {
  delay(30000);
  readDhtData();
  sensors_event_t event;
  tsl.getEvent(&event);
  
  if (event.light)
  {
      
     String jsonString = "{\"humidity\":\"";
    jsonString += strH;
    jsonString +="\",\"temperature\":\"";
    jsonString += strT;
    jsonString +="\",\"lux\":\"";
    jsonString += event.light;
    jsonString +="\"}";
    
    Serial.print('B');
    Serial.print(jsonString);
    Serial.print('E');
    Serial.print('\n');
  }
}

void readDhtData()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  if (isnan(h) || isnan(t)) {
    return;
  }
  
  dtostrf(h,5,2,strH);
  dtostrf(t,5,2,strT);
}
