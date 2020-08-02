HESA Lead Software Developer - Technical Task Summary
=====================================================

## How long did you spend producing the solution?

It took approximately three hours to develop the Users Admin Portal. The Web API project took a little over an hour on Wednesday 29 July. The MVC web site took a little under two hours on Sunday 2 August.  

## Why did you choose the .NET versions and components that you used?

I chose Visual Studio 2019 utilising .NET Core 2.2 because I believe .NET Core is now the most appropriate framework to use for new projects, and those are the versions of the software that I have installed on my laptop.  

I used SQL Server for my persistence layer because HESA operates on a Microsoft .NET stack and because I could then use code first for a one click build and deployment.  

I used a Web API middle tier as this provides a lot of flexibility, particularly with regard to JavaScript front-end framworks.  

I used an MVC website for the web portal as this would proviode a very simple and quick implementation, but I did so in conjunction with a Vue.js application to provide a fast and reactive web site. I also had an existing personal Vue.js component that I had previously developed that I thought would provide a good basis for the functionality.  

## What development approach did you use and why?

My approach was to create a simple, robust application that would support a one click build and deployment; prioritising functionality that met the requirements brief.  

## What design decisions did you make and why?

I chose .NET Core as the most appropriate framework to use for new projects.  

I used SQL Server for my persistence layer because HESA operates on a Microsoft .NET stack and because I could then use code first for a one click build and deployment.  

I used a Web API middle tier as this provides a lot of flexibility, particularly with regard to JavaScript front-end framworks.  

I considered making the Web API queryable to surname data, but given the indicated time scale for the task and the small amount of data stored I felt this was not a priority for this development.  

I considered adding a repository to the Web API Data modules, but decided against this as in this implementation it would not have added any value.  

Once I had decided to prioritise a very simple API I could use an existing self developed component to provide fast, reactive searching of the users data.  

## Given more time what would you have worked on next?

1. Added more sophisticated logging using a package such as Serilog.
2. Improved error handling in the MVC application, including 404 errors.
3. Managing the web client packages within the MVC application rather than using CDN references.