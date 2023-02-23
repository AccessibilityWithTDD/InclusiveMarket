<img src="material/dehsmarket.png" alt="dehsmarket logo">

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Summary

<!--ts-->

- [Prerequisites](#Prerequisites)
- [v0](#v0)
- [v1](#v1)
- [v2](#v2)
- [v3](#v3)
- [Current Version](#Current-Version)

<!--te-->

# Prerequisites

For each version to get accepted, we have only 2 basic prerequisites:
1. Every feature (new and old) should have automated tests, and they all must pass when running `yarn test`;
2. Every version must reach a score of 100 on Google Lighthouse's report.

# v0

The first version of the project (v0) is a basic fork from the original repo, with no tests, a accessibility score below 85, and some key features missing.

This is our first step into a sequence of refactoring, until we reach the minimum requirements for the v1.

# v1

Here we already have a MVP, where we can:

- Have a list of all products showing name, and price for each one;
- Add a product to the cart, inserting the quantity on the product card;
- Show the cart with the name of all the products inserted, as well as the quantity of each one, and the final price.

# v2

This version is a great improvement from our MVP, this time we will be able to:

- Add the image, and description the products on the product card;
- Edit the cart's items, editing the quantity of each product and/or deleting products entirely from the cart;
- Add a loading to the page while it retrieves the items from the server.

# v3

The final version of the project. A iteration focused on the UX for different kind of screens (other than desktop monitors):

- Make the project responsive to the following screens:
    - Mobile phones with a minimum of `320px`, and a maximum of `640px`
    - Tablets with a minimum of `720px`, and a maximum of `1200px`
    - Monitors with a minimum of `1200px`, and a maximum of `2800px`

# Current Version

- v0
