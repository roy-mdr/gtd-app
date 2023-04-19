# gtd-app
Getting Things Done flow inspired app

## 1.- SPA with Svelte
- [x] Make Sotable.js work
- [x] Create input for inbox (add to array of ideas)
- [x] Create inbox-idea component
- [ ] Refactor QuickFullScreen otside the Quick component... Make it App level
- [ ] Start working on Nest

## 2.- Migrate to SvelteKit

# Setup

`git clone <this_repo>`


`cd gtd-app/client-spa/gtd-app-spa`

`npm install`

Copy the contents of `gtd-app/client-spa/gtd-app-spa/src/lib/Sortable.zip` to `gtd-app/client-spa/gtd-app-spa/node_modules/sortablejs` and replace all.

`npm run dev` To start dev server

# Known issues

<details>

<summary>Possible memory leak</summary>

As the fix for correcly smooth-collapse the IncubatorProject component implies creating a new Sortable for a new element each time the container opens (inside an `{#if block}`), the memory for those new Sortables could be incrementing each time the user opens a Project component. This seems to be the case, however it seems that the garbage collector triggers and clean up some of it. Is this enough?

Could be a way for destroying the Sortable on a Project-close event?

Could be a way for re-using the Sortable?

Is this even worth the worry as the minimum impact and low scenario for reproduction? (I dont't think so)

![imagen](https://user-images.githubusercontent.com/8226073/233124122-da88171e-76ac-4885-ab18-d6bf0c77a8e1.png)

</details>
