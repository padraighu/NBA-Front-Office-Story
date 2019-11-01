library(tidyverse)
library(jsonlite)
library(lubridate)

setwd('C:/Users/Yifei Hu/Desktop/nba-gm/analysis')
#dirname(rstudioapi::getActiveDocumentContext()$path)

current_gms <- read_csv('Master.csv')
gm2team <- read_csv('GMToTeam.csv')
gm_pfp <- read_csv('Master.csv') %>% 
  mutate(pfp=str_c(str_replace(Picture, '.jpg', ''), '_pfp.png')) %>% 
  select(Name, pfp) 

current_gms_cleaned <- current_gms %>% 
  mutate(From=year(mdy(`Current Start Date`))) %>% 
  mutate(To=2019) %>% 
  select(Name, Team, From, To) %>% 
  rename(Source=Name, Target=Team) %>% 
  mutate(Current=T)

dat <- read_csv('dat.csv')
gm2gm <- gm2team %>% 
  inner_join(dat, by='Team') %>% 
  select(GM.x, GM.y, Team, From.x, To.x, From.y, To.y) %>% 
  filter((From.x<=To.y)&(From.y<=To.x)&(GM.x!=GM.y)) %>% 
  rowwise() %>% 
  mutate(GM.a=max(GM.x, GM.y), GM.b=min(GM.x, GM.y)) %>% 
  mutate(From=max(From.x, From.y), To=min(To.x, To.y)) %>% 
  distinct_at(vars(GM.a, GM.b, Team, From, To)) %>%
  arrange(Team) %>% 
  select(GM.a, GM.b, From, To) %>% 
  rename(Source=GM.a, Target=GM.b)

all <- gm2team %>% 
  select(GM, Team, From, To) %>% 
  rename(Source=GM, Target=Team) %>% 
  dplyr::union(gm2gm) %>% 
  mutate(Current=F) %>% 
  dplyr::union(current_gms_cleaned)

## only GM-GM
links <- gm2gm %>% 
  ungroup() %>% 
  mutate(length=To-From) %>% 
  group_by(Source, Target) %>% 
  summarise(length_tot=sum(length)) %>% 
  rename(source=Source, target=Target, length=length_tot)
#colnames(links) <- c('source', 'target', 'length')
#links$value <- 1

teams <- current_gms %>% pull(Team)
nodes <- all %>% pull(Source) %>% union(all %>% pull(Target)) %>% unique()
nodes <- data.frame(id=nodes) %>% 
  filter(!id%in%teams) %>% 
  inner_join(gm_pfp, c('id'='Name')) 


# calculate degree
links %>% write_json('links.json')
nodes %>% write_json('nodes.json')

current_gms %>% 
  mutate('Current Start Date'=mdy(`Current Start Date`)) %>% 
  select(
    'Team', 
    'Name',
    'Current Start Date',
    'Current Tenure',
    'Championships as GM',
    'Executive of the Year',
    'Ex NBA Player',
    'Ex College Player',
    'Ex NBA Coach',
    'Ex College Coach',
    'Ex Agent',
    'Ex Scout',
    'Ex Video',
    'MBA',
    'JD',
    'Promoted',
    'Sloan',
    'Picture'
    ) %>% 
  filter_all(any_vars(!is.na(.))) %>%
  mutate(Picture=str_replace(Picture, '.jpg', '_pfp.png')) %>% 
  write_json("gms.json")
