# Week 5 Task: Developing a Single Page Application (SPA) Simulation

## 1. Project Title
**NovaSPA – Single Page Application Simulation**

## 2. Objective
The objective of this project is to develop a small-scale Single Page Application using HTML, CSS and JavaScript. The application dynamically changes its content without requiring a complete browser page reload. It also demonstrates client-side routing, browser history management, responsive design, transitions and basic error handling.

## 3. Technologies Used
- **HTML5** – semantic structure and application shell.
- **CSS3** – responsive layout, visual design, navigation states and animations.
- **JavaScript (ES6+)** – client-side routing, DOM manipulation, browser History API, form handling and state-aware rendering.

## 4. Folder Structure
```text
week5_spa/
├── index.html
├── style.css
├── script.js
└── TECHNICAL_REPORT.md
```

## 5. Architecture
The application follows a simple SPA architecture:

1. `index.html` contains the permanent application shell, header, navigation, main content container and footer.
2. `style.css` controls the complete visual presentation and responsive behavior.
3. `script.js` contains route definitions and the rendering system.
4. The `<main id="app">` element is replaced dynamically when the user navigates.
5. Browser History API methods update the URL without performing a full page request.

### Application Flow
```text
User clicks navigation link
        ↓
JavaScript intercepts click
        ↓
Route is identified
        ↓
DOM content is replaced
        ↓
History API updates URL
        ↓
Active navigation state changes
        ↓
User sees new content without reload
```

## 6. Implemented Routes
| Route | Purpose |
|---|---|
| `/` | Home page and project introduction |
| `/about` | Explains the SPA architecture |
| `/services` | Demonstrates the implemented features |
| `/contact` | Interactive demonstration form |
| Unknown route | Custom 404 error view |

## 7. Dynamic Content Management
Route data is stored in a JavaScript object. Each route contains the HTML required for its view. The `render()` function selects the appropriate route and assigns its content to the `#app` container.

This approach avoids creating multiple HTML pages and demonstrates the central concept of an SPA: one application shell with dynamically changing views.

## 8. Client-Side Routing
Navigation links use the `data-link` attribute. A document-level click handler detects these links and prevents the browser's normal navigation behavior.

The application then calls the `navigate()` function. `navigate()` determines the requested route and calls `render()` with history updating enabled.

The URL is changed using:

```javascript
history.pushState({ route }, '', newPath);
```

No complete page refresh is required.

## 9. Browser History Management
The project uses the `popstate` event to support browser Back and Forward buttons.

```javascript
window.addEventListener('popstate', () => {
  render(routeFromPath(), false);
});
```

When the user moves backward or forward in browser history, the current URL is read again and the correct view is rendered.

## 10. User Interface and Accessibility
The interface was designed with:
- Responsive navigation for desktop and mobile devices.
- Semantic `header`, `nav`, `main`, `section`, `article` and `footer` elements.
- Accessible navigation labels.
- `aria-current` to identify the current page.
- `aria-live` on the application container for dynamic content updates.
- Visible keyboard focus states for form controls.
- Clear button and link states.
- Readable typography and sufficient spacing.

## 11. Transitions and Animations
Each dynamically rendered page receives a short entrance animation. Buttons and cards also use subtle hover transitions. These effects make navigation feel smoother while keeping the interface lightweight.

## 12. Form Handling
The Contact page contains a demonstration form. JavaScript intercepts the submit event using `preventDefault()`. A confirmation message is displayed directly in the DOM, demonstrating another interaction that does not reload the page.

## 13. Error Handling
If a route is not present in the route configuration, the application displays a custom 404 view. This prevents an unknown URL from leaving the application empty or broken.

## 14. Development Challenges
### Challenge 1: Navigation without reloads
Normal anchor navigation would cause the browser to load another document. This was solved by intercepting internal links with JavaScript.

### Challenge 2: Keeping URLs meaningful
A SPA should still provide understandable URLs. The History API was used so the URL changes to paths such as `/about` and `/services`.

### Challenge 3: Browser Back/Forward buttons
Changing the URL alone is not enough. The `popstate` event was implemented so browser navigation also changes the displayed content.

### Challenge 4: Unknown routes
Users can manually enter a path that does not exist. A fallback 404 view was therefore added.

### Challenge 5: Mobile navigation
A compact mobile menu was implemented using JavaScript and CSS media queries.

## 15. Testing Performed
The following workflow should be tested before submission:

1. Open `index.html` in a browser.
2. Click Home, About, Services and Contact.
3. Confirm that the content changes without a full page refresh.
4. Check that the browser URL changes for each route.
5. Use browser Back and Forward buttons.
6. Open an unknown route and verify the 404 screen.
7. Submit the Contact form and verify that no page reload occurs.
8. Resize the browser to test the responsive navigation.
9. Test keyboard navigation through links and form controls.

## 16. Result
The completed project demonstrates the main characteristics of a Single Page Application: a permanent HTML shell, dynamically rendered views, client-side routing, browser history manipulation, responsive UI, transitions and error handling.

## 17. Conclusion
NovaSPA successfully simulates a small-scale SPA using only HTML, CSS and JavaScript. The project demonstrates how modern web applications can update selected parts of a page instead of requesting a complete new document for every navigation action. The implementation is intentionally lightweight and suitable for understanding the fundamental concepts behind SPA architecture.
