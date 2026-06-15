FROM rust:1-slim-bookworm
LABEL authors="Drew Chase"

RUN apt update \
 && apt install -y --no-install-recommends \
        pkg-config \
        libssl-dev \
        build-essential \
        ca-certificates \
        git

run apt install npm -y --no-install-recommends
run npm i pnpm -g
run cargo install just


ENV CARGO_TARGET_DIR=/target
WORKDIR /workspace
CMD ["just", "build"]