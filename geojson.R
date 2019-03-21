library(sf)
library(geojsonio)
library(geojsonsf)
library(dplyr)

sf <- read_sf("F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/2010_Tracts_with_ACS_data.shp")
sf <- sf %>% st_set_crs(2272) %>% st_transform(4326)
geojson <- sf_geojson(sf)
geojson_write(geojson, file = "F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/2010_Tracts_with_ACS_data.geojson")

sf2 <- read_sf("F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/2010TOD_Tracts.shp")
sf2 <- sf2 %>% st_set_crs(2272) %>% st_transform(4326)
geojson2 <- sf_geojson(sf2)
geojson_write(geojson2, file = "F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/2010TOD_Tracts.geojson")

phila_county.
sf3 <- read_sf("F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/phila_county.shp")
sf3 <- sf3 %>% st_set_crs(2272) %>% st_transform(4326)
geojson3 <- sf_geojson(sf3)
geojson_write(geojson3, file = "F:/BACKUP/18FALL/590_MUSA/HW1_Data_TOD_Study/phila_county.geojson")

sf4 <- read_sf("F:/BACKUP/18FALL/590_MUSA/Week1HW/Phila_transit_stops_JoinedA4.shp")
st_geometry(sf4)
sf4 <- sf4 %>% st_set_crs(2272) %>% st_transform(4326)
geojson4 <- sf_geojson(sf4)
geojson_write(geojson4, file = "F:/BACKUP/CPLN611JavaScript/Midterm/stations.geojson")

names(hed)
sf5 <-
  hed %>%
  na.omit %>%
  select(ADDRESS,sale_price,inf_prc_ft,d_septa,STATION,lt_qrtMi,QrtMiDist,uniqueid,
         longitude,latitude) %>%
  st_as_sf(coords = c("longitude", "latitude"), crs = 4326, agr = "constant") %>%
  st_sf() 
st_geometry(sf5)
write_sf(sf5,"F:/BACKUP/CPLN611JavaScript/Midterm/Property_Phila.shp")

sf5<-read_sf("F:/BACKUP/CPLN611JavaScript/Midterm/Property_Phila.shp")
st_geometry(sf5)
geojson5 <- sf_geojson(sf5)
hedSummary<-st_sf(hedSummary) %>%
  st_set_crs(4326) 
hedSummary <- st_drop_geometry(hedSummary)
sf6 <-
  hedSummary %>%
  st_as_sf(coords = c("LONGTUDE", "LATITUDE"), crs = 4326, agr = "constant") %>%
  st_sf() 
names(hedSummary)
st_geometry(sf6)
geojson_write(sf6, file = "F:/BACKUP/CPLN611JavaScript/Midterm/stations.geojson")

quantile(hed$inf_prc_ft,0.9)
