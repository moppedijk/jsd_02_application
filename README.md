# Web-application

This git repository is the second part of a larger project. 
This larger project aims at developing web-applications with open data which are easy to maintaint due to the use of component lib's and styleguides. Below links to all the git repositories:
- [jsd_01_kickstart] (https://github.com/moppedijk/jsd_01_kickstart)
- [jsd_02_application] (https://github.com/moppedijk/jsd_02_application)
- [jsd_03_components] (https://github.com/moppedijk/jsd_03_components)

## Synopsis

The aim of building this application was to create something which could be used to learn Meteorjs. This web-application was build with the use of the Art Holland API with data about events and venues. Sadly the Art Holland API went offline so I had rewrite the application to support other open data. I used a open data source of [veiligstallen.nl] (http://www.veiligstallen.nl/veiligstallen.xml) for the development of this application. 

So What has changed in two years? When I started the development of this Meteorjs application the framework just launched. The hosting of Meteor applications was still free. Less integrations then the current version. Meteor now supports Angular, React, GraphQl and NPM which is a huge improvement.

## Code Example

For code check the repository, I tried to write comments for every function.

## Motivation

The motivation to use Meteorjs for the development of this web-application was because Meteorjs is more than just a framework. It takes over the whole development process which I used to structure myself. Integrations, task-runners etc.

## Installation

For the installation of Meteorjs follow the instructions on [www.meteor.com] (https://www.meteor.com/install). While developing this web-application I installed some plugins which are listed below:

Iron router: `meteor add iron:router`

First I added sass support with: `meteor add fourseven:scss` but later i changed it to `meteor add francocatena:compass`.

## API Reference

For reference check the [Meteorjs documentation] (http://docs.meteor.com/#/full/)

## Contributors

This project is contributed by Joost F. (https://github.com/joostf). For open data resources check the [Open Data Nederland] (https://opendatanederland.org/) platform. I used the [Fietsparkeerdata API] (https://opendatanederland.org/nl/dataset/fietsparkeerdata-xml).

## Licence
GNU General Public Licence 2.0
