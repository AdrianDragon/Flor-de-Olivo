# Flor de Olivo Website

This project is a React web application for Flor de Olivo, a Mediterranean products store.

## Features

- Product catalog with detailed product pages and reviews
- Shopping cart functionality
- User authentication system
- User profile management
- Admin dashboard for product management
- Responsive design

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
REACT_APP_SUPABASE_URL=https://your-project-url.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Replace the placeholder values with your Supabase project credentials.

### Supabase Setup

This project uses Supabase for authentication and database functionality. 
To set up your Supabase project:

1. Create a new project at [supabase.com](https://supabase.com)
2. Set up the following tables in the Supabase database:

#### profiles table

```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  name text,
  email text,
  first_name text,
  last_name text,
  phone_number text,
  address text,
  city text,
  country text,
  postal_code text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone,
  primary key (id)
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Create a trigger to create a profile entry when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role)
  values (new.id, new.raw_user_meta_data->>'name', new.email, 'customer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Running the Project

```bash
npm start
```

The application will be available at http://localhost:3000.

### Building for Production

```bash
npm run build
```

### Deployment

The build folder is ready to be deployed. You may serve it with a static server:

```bash
serve -s build
```

## Descripción

Esta es una aplicación web desarrollada con React y Tailwind CSS para mostrar productos gourmet mediterráneos con un diseño elegante y profesional. El sitio incluye:

- Página de inicio con secciones para presentación de la empresa, productos destacados y testimonios
- Catálogo de productos con funcionalidad de búsqueda
- Página "Sobre Nosotros" con información de la empresa
- Página de contacto con formulario funcional
- Carrito de compra con gestión básica de productos

## Características Técnicas

- Desarrollado con React + TypeScript
- Estilizado con Tailwind CSS
- Diseño responsive para todos los dispositivos
- Contexto de React para manejar el estado del carrito
- Formularios con validación
- Estructura de componentes modular y reutilizable

## Reemplazar Imágenes Placeholder

Actualmente, el sitio utiliza imágenes de stock gratuitas como placeholders. Para reemplazar estas imágenes:

1. Localiza las URL de imágenes en los archivos:
   - `src/pages/HomePage.tsx`
   - `src/pages/ProductsPage.tsx`
   - `src/pages/AboutPage.tsx`
   - `src/components/Header.tsx` (logo)

2. Reemplaza las URL con tus propias imágenes. Puedes:
   - Usar rutas relativas para imágenes en la carpeta `public`
   - Importar imágenes en la carpeta `src/assets`
   - Continuar usando URLs externas de tus propias imágenes

## Estructura del Proyecto

```
flor-de-olivo/
├── public/                  # Archivos públicos
├── src/                     # Código fuente
│   ├── assets/              # Imágenes, fuentes y otros recursos
│   ├── components/          # Componentes reutilizables
│   ├── context/             # Contextos de React (carrito)
│   ├── pages/               # Componentes de página
│   ├── App.tsx              # Componente principal
│   ├── index.tsx            # Punto de entrada
│   └── index.css            # Estilos globales
├── package.json             # Dependencias y scripts
└── tailwind.config.js       # Configuración de Tailwind CSS
```

## Tecnologías Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Heroicons
- Headless UI

## Autor

Este proyecto fue creado como un prototipo para demonstración. 