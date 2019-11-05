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

#dat <- read_csv('dat.csv')
# combine past with current experiences 
dat <- gm2team %>% 
  select(GM, Team, From, To) %>% 
  dplyr::union(
    current_gms %>% 
      filter_all(any_vars(!is.na(.))) %>% 
      mutate(From=year(mdy(`Current Start Date`)), To=2019) %>% 
      rename(GM=Name) %>% 
      select(GM, Team, From, To) 
  ) 
gm2gm <- gm2team %>% 
  inner_join(dat, by='Team') %>% 
  select(GM.x, GM.y, Team, From.x, To.x, From.y, To.y) %>% 
  filter((From.x<=To.y)&(From.y<=To.x)&(GM.x!=GM.y)) %>% 
  rowwise() %>% 
  mutate(GM.a=max(GM.x, GM.y), GM.b=min(GM.x, GM.y)) %>% 
  mutate(From=max(From.x, From.y), To=min(To.x, To.y)) %>% 
  distinct_at(vars(GM.a, GM.b, Team, From, To)) %>%
  arrange(Team) %>% 
  select(GM.a, GM.b, Team, From, To) %>% 
  rename(Source=GM.a, Target=GM.b)

all <- gm2team %>% 
  select(GM, Team, From, To) %>% 
  rename(Source=GM, Target=Team) %>% 
  dplyr::union(gm2gm %>% select(Source, Target, From, To)) %>% 
  mutate(Current=F) %>% 
  dplyr::union(current_gms_cleaned)

## merge intervals
merge_int <- function(ints) {
  years <- unlist(map(str_split(ints, ", "), ~ str_split(., "-")))
  if (length(years) == 2) return(ints)
  years <- tbl_df(years) %>% 
    group_by(value) %>% 
    summarise(n=n()) %>% 
    filter(n==1|n==3) %>% 
    pull(value)
  merged <- c()
  if (length(years) <= 1) 
  {
    years <- unlist(map(str_split(ints, ", "), ~ str_split(., "-")))
    years <- unique(years)[1:2]
  }
  for (i in seq(1,length(years)-1,2)) {
    merged <- c(merged, str_c(years[i], years[i+1], sep="-"))
  }
  str_c(merged, collapse=", ")
}
## only GM-GM
links <- gm2gm %>% 
  ungroup() %>% 
  mutate(length=To-From) %>% 
  unite(fromto, From:To, sep="-") %>% 
  group_by(Source, Target) %>% 
  summarise(length_tot=sum(length), 
            duration=str_c(fromto, collapse = ", "), 
            team=str_c(unique(Team), collapse = ',')) %>% 
  rowwise() %>% 
  mutate(duration=merge_int(duration)) %>% 
  rename(source=Source, target=Target, length=length_tot) 

#links %>% filter(length==0)

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
