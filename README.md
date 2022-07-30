# VRChat Notes Chrome Extension (Deprecated)

NOTE: Notes have now been natively added to the VRChat Website.

<p>This extension allows users to take notes of new friends they have made in VRChat on the official [VRChat](https://vrchat.com/home) website. All data is stored on localstorage so please ensure you take frequent backups of your notes using the menu (see below).</p>

# Lessons Learned
- Learned how to create chrome extensions using Manifest V3.
- Learned how to use ChromeStorage API so the popup menu was able to access data stored on the VRChat website.
- It was interesting to use native JavaScript functions to inject custom Elements such as my notes element and ensure it is responsive, and is able to re-render whenever a new users profile is viewed.

# Future Work
- Cloud backup of notes using a backend such as Firebase's Firestore

# Screenshots

## Without Notes Extension

![image](https://user-images.githubusercontent.com/55749172/179184192-2ff07f84-a64a-4e91-9da5-7ef1d78b1444.png)

## With Notes Extension

![SS1 1920x1080](https://user-images.githubusercontent.com/55749172/175988180-531fe311-6cf1-4075-9067-2618d2402629.png)

## Mobile Screenshot
![MOBILE Ip12pRO](https://user-images.githubusercontent.com/55749172/175988191-6527485b-4e24-4d6b-acbd-029f5477bccd.png)

## Menu
![Menu](https://user-images.githubusercontent.com/55749172/175988108-1c9ee36a-30e5-4da4-8dd0-3c79b5d67b3c.png)
