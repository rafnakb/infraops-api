variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "lambda_function_name" {
  default = "infraops-api"
}

variable "lambda_zip" {
  description = "Path to Lambda deployment package"
  default     = "dist/lambda.zip"
}
