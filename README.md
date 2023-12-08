# audio_video_rec

This is a prototype for a coding challenge presented to me by PIVODIO. Time was set at 2-3 hours to see how far I would get with the following conditions:

- Written in React only
- Uses the Remix framework

Style and presentation was not a requirement.

Notes / Result:

[1] Of the  2 - 3 hours, I lost time setting up a dev environment from scratch for this and getting familiar with Remix. It was an unknown framework for me. 

[2] It does the basic single recording. Potential improvements / TODO:

- Track multiple attempts, allowing the user to select the one they feel has the most quality for transmission
- Error handling. In this day and age of hyper vigilance over security, there needs to be error handling here to account for browsers and security packages blocking the recording in some way. 
- Enhanced user feedback. This prototype lacks any. It needs a good deal to be a proper module for public use.
- Comment feedback tracking. Potentially feedback and comments related to the selected video could be recorded. This could be notes added by the person doing the recording... or perhaps the person who is reviewing it? Or both? Both is good.

[3] My own personal take:

Interesting. A project like this, if tackled for real, needed to start with a UX design pass handled in an Agile/Spring mindset. The basic user interaction here is record the video/audio but there is a depth of error handling, feedback and more that span the human to machine space. This needs to be explored even if through a basic wireframe before code is actually touched, or most of the key code was touched.

Likewise, a solid UX/UI design pass would have captured the "input mode". Such as :

- What device is the user attempting to use? Phone? Tablet? Folding phone? mini tablet? etc? Each one has different viewports and so would have different UX requirements to allow a smooth human to machine interaction

- American Disability Requirements (ADA). Following on the above, ADA is critical. What if the person doing the recording is hearing impared ( aka Beethovin )? Or lives life with any other physical challenge? The UX/UI here should accommodate this.

That pass would drive out a lot of the deeper aspects that need to be done.

Beyond the 2 to 3 hours, I would pull back to the UX/UI phase to flush all that out into the open. Then dive back in to fill in the weak spots of the project.