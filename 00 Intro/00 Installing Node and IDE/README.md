# 00 Installing Node and IDE

In this sample we are going to install and configure Node.js and VS Code.

Summary steps:

- Install last recommended LTS Node version.
- Install different Node.js versions.
- Install VS Code.
- Configure `.editorconfig`.
- Configure `eslint`.

# Steps to build it

# Steps

- To install Node.js, we have to navigate to [https://nodejs.org/en/](https://nodejs.org/en/) and select the `Recommended For Most Users`. In this case, we are going to install `8.9.0 for Windows(x65)`. We can click on `Other Downloads` to downloads other `OS platforms`:

![download node](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/download%20node.png)

- Now, if we open `Node.js command prompt`:

![node console](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/node%20console.png)

- We could type `node -v`:

```bash
node -v
```

![node version](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/node%20version.png)

- When we install `Node.js`, it installs `npm` too. [`npm`](https://www.npmjs.com/) is the package manager for JavaScript where we could install third party libraries in our projects:

```bash
npm -v
```

![npm version](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/npm%20version.png)

- There are some times that we need to have installed a specific node version, in most cases an older version. How we can deal with it? We need to install [`nvm (Node Version Manager)`](https://github.com/creationix/nvm), [`nvm-windows (for Windows)`](https://github.com/coreybutler/nvm-windows):

- In this case, we are going to install the Windows one:

![download nvm 1](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/download%20nvm%201.png)

![download nvm 2](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/download%20nvm%202.png)

- Now in `Node.js command prompt`:

```bash
nvm -v
```

![nvm version](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/nvm%20version.png)

- Running `nvm list`:

```bash
nvm list
```

![nvm list](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/nvm%20list.png)

- As example we are going to install `node v6.11.1` the previous LTS recommended version by Node.js:

```bash
nvm install 6.11.1
```

![install version 6](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/install%20version%206.png)

- And use it (remember execute Node.js command prompt as administrator):

![console as administrator](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/console%20as%20administrator.png)

```bash
nvm use 6.11.1
```

- Now, if we type `node -v`:

```bash
node -v
```

![use node 6](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/use%20node%206.png)

- Install [VS Code](https://code.visualstudio.com/):

![download vs code](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/download%20vs%20code.png)

- This IDE has too many features by default but If you want, you could install more plugins. Some interesting plugins are `EditorConfig for VS Code`, `ESLint` and `TSLint`:

![code plugins](../../99%20Resources/00%20Intro/00%20Installing%20Node%20and%20IDE/code%20plugins.png)

- `EditorConfig` helps developers define and maintain consistent coding styles between different editors and IDEs.

- To configure it, we have to place a `.editorconfig` file in `project root path`:

- Top-most EditorConfig file:

### ./.editorconfig

```diff
+ root = true

```

- Apply to all files in project:

### ./.editorconfig

```diff
root = true

+ [*]

```

- Indent style 2 and spaces:

### ./.editorconfig

```diff
root = true

[*]
+ indent_size = 2
+ indent_style = space

```

- Insert always end of line and windows style:

### ./.editorconfig

```diff
root = true

[*]
indent_size = 2
indent_style = space
+ insert_final_newline = true
+ end_of_line = crlf

```

- Use `UTF-8` as encoding:

### ./.editorconfig

```diff
root = true

[*]
indent_size = 2
indent_style = space
insert_final_newline = true
end_of_line = crlf
+ charset = utf-8

```

- Remove any whitespace char preceding new line:

### ./.editorconfig

```diff
root = true

[*]
indent_size = 2
indent_style = space
insert_final_newline = true
end_of_line = crlf
charset = utf-8
+ trim_trailing_whitespace = true

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
