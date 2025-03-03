# Contributing
Before you contribute, it's important to understand some of the guidelines for contributing. This is done so that code standards and others go hand in hand and create a project environment that is easy to maintain.

### Code writing
Well-written code can simplify the maintenance process or a change in the future, it is also important to make variable names consistent and clear to simplify and speed up the development process because it already represents the name and function of the variable.

### Semantic commit
Semantic commit is very important for managing and checking changes to every code that is pushed into the repository, use semantic commit for your contribution to make it easier to manage further in the future. semantic commit has several of the most common types, namely: feat, add, fix, chore, docs, modified, and others.

I hope, you understand how to use this semantic commit
```txt
Type<Scope>: message
```

- **feat**: Used when adding new features to an application or module.
- **add**: Used when adding new files or minor changes - to the project structure.
- **fix**: Used when fixing bugs or problems in the application.
- **chore**: Used for maintenance tasks that do not affect the application code, such as dependency updates.
- **docs**: Used when adding or updating documentation.
- **modified**: Used for changes to existing code or features, but not a new feature.

Examples of semantic commit usage:
- `feat: added uploadFile() function to upload files to the server`
- `fix: fix bug in input form validation`
- `docs: update project setup documentation`

Example of using semantic commit with scope:
- `feat(util): add file size reader`
- `fix(cdn): pomf api update`
- `modified(util/helper): typo at line 12`

By following the semantic commit standard, any changes made can be easily understood by all project contributors and help in tracking the history of changes to the repository.