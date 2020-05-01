FROM python:3.8
ARG DJANGO_ENV

ENV DJANGO_ENV=${DJANGO_ENV} \
  # python:
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  # pip:
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.0.2 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry' \
  # application
  SECRET_KEY="" \
  PG_USER="" \
  PG_PASSWORD="" \
  PG_HOST="" \
  PG_PORT=""

RUN mkdir /code
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /code
COPY ./poetry.lock ./pyproject.toml /code/

# Project initialization:
RUN echo "$DJANGO_ENV" \
  && poetry install \
    $(if [ "$DJANGO_ENV" = 'production' ]; then echo '--no-dev'; fi) \
    --no-interaction --no-ansi \
  # Cleaning poetry installation's cache for production:
  && if [ "$DJANGO_ENV" = 'production' ]; then rm -rf "$POETRY_CACHE_DIR"; fi

COPY . /code

CMD /code/docker-entrypoint.sh
#poetry run python manage.py runserver 0.0.0.0:8000