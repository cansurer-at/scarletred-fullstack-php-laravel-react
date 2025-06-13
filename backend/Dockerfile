# Use official PHP 8.2 FPM image
FROM php:8.2-fpm

# Set the working directory inside the container
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# Copy Composer from official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy and prepare environment configuration (optional: if .env is available)
COPY .env.example .env

# Copy only composer files to leverage Docker cache
COPY composer.json composer.lock ./

# Install PHP dependencies without development packages
RUN composer install --no-dev --optimize-autoloader

# Copy the entire application source
COPY . .

# Generate Laravel application key
RUN php artisan key:generate

# Set proper permissions
RUN chown -R www-data:www-data /var/www

# Expose port 8000 to make the application accessible
EXPOSE 8000

# Start Laravel’s built-in server
CMD php artisan serve --host=0.0.0.0 --port=8000
