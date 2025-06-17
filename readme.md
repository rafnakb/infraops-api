# InfraOps API – Lambda Deployment with Docker and Terraform

This project uses Docker and Terraform to build and deploy a TypeScript-based AWS Lambda function. The setup ensures environment isolation and repeatable builds using Docker, while Terraform provisions the infrastructure.

---

## Project Structure

- `Dockerfile.lambda`: builds the Lambda function and creates the deployment package (`lambda.zip`).
- `docker-compose.yml`: orchestrates services for Lambda build and infrastructure provisioning.
- `infra/`: Terraform configuration files for AWS resources.
- `dist/`: Stores the generated `lambda.zip` used by Terraform.
- `.aws/`: AWS credentials directory (should include `config` and `credentials`).

---

## Prerequisites

- Docker + Docker Compose
- AWS credentials with permissions for Lambda and IAM
- `.aws/config` and `.aws/credentials` files at the root of the project

---

## Workflow Overview

1.  **Build Lambda Function Image**

    This step uses `Dockerfile.lambda` to compile the code and package the Lambda zip.

    ```bash
    docker compose build lambda-builder
    ```

2.  **Generate lambda.zip on Host**

    Runs the container, triggering the `build:lambda` script and exposing the generated `lambda.zip` to the host's `./dist` folder:

    ```bash
    docker compose run --rm lambda-builder
    ```

3.  **Provision AWS Infrastructure with Terraform**

    All Terraform commands run in an isolated container with `.aws` credentials and access to `./dist/lambda.zip`.

    Initialize:

    ```bash
    docker compose run --rm terraform terraform init
    ```

    Plan:

    ```bash
    docker compose run --rm terraform terraform plan
    ```

    Apply:

    ```bash
    docker compose run --rm terraform terraform apply
    ```