# :high_brightness: Pahinungod Events :high_brightness:
> by: Legolas Tyrael Lada, Owen Cariño, Venmark Recla

- [Project description](#project-description)
- [Project links](#project-links)
- [Technologies used](#technologies-used)
- [Setting up your development environment](#setting-up-your-development-environment)
- [Project structure](#project-structure)

## :sparkle: Project description

An application for **Ugnayan ng Pahinungod** dedicated to streamlining their
event handling process. This ranges from creating and managing events, storing
volunteer data, and having an interface for volunteers to apply for and view
events.

## :sparkle: Project links

- [Mockups](https://www.figma.com/file/UvdgHETKpmcs4LlQpwsTeE/Pahinungod-App-Wireframe?type=design&node-id=0%3A1&mode=design&t=aLL74Tm9HczTlgIF-1)
(Figma)
    - Point-person: Owen
- [ERD](https://lucid.app/lucidchart/cecfe840-e88b-4dd2-b381-c21c22818999/edit?viewport_loc=-1615%2C-1405%2C3081%2C1379%2C0_0&invitationId=inv_06856abc-0439-47c5-82ee-315c90cc5f83)
(Lucidchart)
    - Point-person: Venmark
- [Deployment for `staging`](https://pahinungod-events.vercel.app/dashboard/events)
(Vercel)
    - Point-person: Tyrael

## :sparkle: Technologies used

- **Next.js & Typescript** (Frontend Framework)
    - https://nextjs.org/
    - https://www.typescriptlang.org/
- **Supabase** (Backend as a Service, Database and Authentication)
    - https://supabase.com/
    - https://supabase.com/auth
- **Vercel** (Deployment Service)
    - https://vercel.com
- **Figma** (UI/UX Software, Mockups)
    - https://figma.com
- **Github** (Version Control)
    - https://github.com

## :sparkle: Setting up your development environment

> NOTE: The following code snippets will be in a UNIX shell. 

> If you're working with a Windows shell, such as PowerShell, then you can
> either replace the commands with their counterparts in PowerShell. Or take
> the recommended route, use ~~a Linux OS~~ Windows Subsystem for Linux 
> ([WSL](https://learn.microsoft.com/en-us/windows/wsl/about)).


You can start by first *cloning* this repository into your local development
environment.

```bash
# create a directory named pahinungod-events:
git clone https://github.com/44mira/pahinungod-events.git

# or, alternatively, put clone the repo into a named directory:
git clone https://github.com/44mira/pahinungod-events.git ./<DIR>
```

Navigate into your directory and run `npm install` (or `npm i`) to install all
dependencies (Make sure you have [Node.js](https://nodejs.org/en)).

```bash
cd pahinungod-events
npm install
```

Setup your environment variables in `.env.local` at the root directory of
your project. The values to be put in here are your *Supabase* keys which can
be retrieved from the Supabase project to which you have access to.

These are found in the **API Settings** tab in the sidebar.

```bash
# ./.env.local
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```

Then you can either open your IDE, or run the development server (Or both).
```bash
code .      # open VSCode in the current directory

npm run dev # run the development server at localhost:3000
```

## :sparkle: Project structure

- Example directory structure (from commit
  [d007ce3](https://github.com/44mira/pahinungod-events/commit/d007ce301ec7bb75e7bd30511e4408aa4b8fd88c))
    - Example directories will be tagged with `~~`.
    - Directories not commonly interacted with will be tagged with an asterisk
      `--`.

``` bash
@
├── lib                     # -- utilities used by shadcn/ui
├── actions                 # server actions, mainly used for auth
│   └── auth                
├── components              # global components
│   └── ui                  # configurations for shadcn/ui components
├── supabase                # -- supabase CLI seed for linking
├── app                     # folder for routes, most visited
│   └── dashboard           # ~~ a route for the dashboard page
│       ├── profile         
│       ├── volunteers
│       └── events          # ~~ routes have their own scopes for co-location
│           ├── _api        # ~~ private _api route for types and schemas (will be renamed)
│           └── [event_id]  # ~~ a dynamic route for event information page
├── hooks                   # custom hooks for querying supabase
├── public                  # static images and icons
└── utils                   # -- supabase setup and types
    └── supabase            # -- supabase client setup
```

> NOTE: `@/**/_api/` private routes were initially made to have the hooks
> defined in `@/hooks/`, so either the `_api` convention will be replaced with
> `_types` or the custom hooks in `@/hooks/` are co-located.
