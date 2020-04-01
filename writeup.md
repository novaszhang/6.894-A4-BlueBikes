# BlueBike Trips in 2019: Station Traffic Over Time
Dao Ming and Nova Zhang

### Design Rationale

Bike sharing has become more and more popular in large cities, and we were curious whether or not we could visualize the complex network of bikes.Located in Boston, we thought it would be relevant for the MIT community and locals to see the flow of Bluebikes, the bikesharing service here. 

Understanding traffic is relatively complex - each user can take trips from any station to any station, as there is no limitation on distance except for the location and availability of stations. Thus, at any given moment there up to thousands of people riding bikes in any direction. To be able to visualize it, we narrowed down our scope. Specifically, we wanted to see what stations are the busiest at given hours. 

We define “busyness” in two ways - incoming trips and outgoing trips. Thus, we decided to add a button so that a user viewing our application can choose which type of “busyness” they want to look at. For data filtering, we used 2019 Bluebikes data to limit the scope. We then aggregated the number of incoming and outgoing trips at each station for each hour of the day (of the week). We chose hourly due to the fact that traffic may be impacted by time (ex. Rush hour). In addition, we chose to aggregate the days of each month into days of the week, instead of doing each individual day. This was done in part to limit the size of the data, but also it is very likely that we can observe similar behavior for the same days of the week. For example, weekdays may be busier than weekends for some stations.

The Bluebike stations are scattered around the Greater Boston area. There is no uniformity in how the stations are layed out, so we had to choose a method that would allow for each station to be compared at different distances away from each other. Thus, we chose to represent the number of trips at each station for a given time with bubbles, where the size of the bubble represents the number of trips. Given the large range in number of trips, we had to employ a semi-log scale with min, max radii so as to ensure that the visualization was aesthetically pleasing, while still communicating the size difference effectively. 

Additionally, in order to see the progression over time, we decided to give users the option of seeing how the bubbles change for each hour of the day. We chose to use a slider because it would allow for more fluidness when seeing the bubble maps for each hour and it is more intuitive for time, since time is not discrete. Compared to a simple dropdown/entry box, it allows for the user to easily drag the slider an hour at a time, to visualize the traffic movement over the course of a day.

Meanwhile, we chose a dropdown for the month and day because they are discrete values and thus selection made more sense than other modes of changing values. However, for incoming and outgoing trips, we decided to go with a button. Given that there are only 2 categories (incoming & outgoing), it was more intuitive. It also allowed us to naturally indicate the color of the bubbles with the color of the button, allowing users to associate the incoming or outgoing setting with the view that they are currently seeing.

By deliberately putting options to change the parameters on top, we allow users to fully see the context for the map they are seeing and change it as they please. The map is also zoomable so that you can view particular stations in more detail and lower the scope of your view. This is particularly important because there are so many stations in the Bluebike system and a view with all the stations at once makes it difficult to view and differentiate the bubble sizes.

Lastly, we put a button for information about the project on the bottom left corner. We chose to keep it transparent with colors that did not stand out too much in order to not detract from the visualization. When you hover over it however, it fills with color so you know you can click on it. We added a description of how the data was transformed in preparation for visualization and where the data is from. We also put our names and contact information in order to be reachable by anyone who has questions about the visualization. In this way, we can allow people to see where the data originated from and be transparent about our process.

## Development Process

First, we met up to brainstorm numerous ideas for the visualization domain and data. We set out several considerations for what we sought for in a good project: locality for relevance to our daily lives, simplicity for interpretation by the audience and quality data. With these in mind, we decided on visualizing the Boston/Cambridge BlueBikes dataset. 

As a team, we charted the phases of the project and categorized the various tasks. Given her extensive experience in using HTML and CSS for web-based development, Nova focused on organizing the structure and style of the visualization. Meanwhile, Dao Ming was responsible for data wrangling in R (filtering, selecting, joining etc) to obtain the desired format conducive for representation of the stations and trips at various time scales (month, day of week, hour). This was relatively straightforward and did not take much time.

We each then progressed onto specific aspects of the visualization. Nova led the effort to create the various interactive controls - buttons, dropdown boxes and sliders - that would record the user’s choices in HTML and Javascript, employing D3 extensively for functionality. 

On the other hand, Dao Ming employed D3 and Leaflet mapping libraries in Javascript to create the map and its associated layers (bike lanes, station markers), as well as stylistic finishes. Due to various issues w/ using svg layers in Leaflet we encountered, we decided to go with a predominantly Leaflet approach for mapping. 

This took a substantial amount of time. Our unfamiliarity with d3 and Leaflet, as well as HTML, CSS and Javascript for Dao Ming, entailed a steep learning curve that required substantial time invested in learning the basics operations. Much more time was spent in debugging issues that cropped up, as well as sourcing and learning relevant packages that would serve our vision for the visualization.

At this point, we collaborated closely on joining the key pieces of the project. Nova worked on data filtering using user input gathered from the interactive selection elements to obtain data relevant to timeframes chosen, while Dao Ming was key in building the pipeline for the data to the mapping visualization. 

Again, this part of the project was time-consuming, involving much of the same processes as the previous phase, albeit not as demanding given our new-found experience.

All in all, we spent roughly 30 hours each working on the visualization, totaling 60 people-hours. 
