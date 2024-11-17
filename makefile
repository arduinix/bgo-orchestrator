# directory configuration
TERRAFORM_DIR = ./terraform
TERRAFORM_ENVS_DIR = ./envs

# Get the environment name from the command line
ENV ?= dev

BACKEND_CONFIG_FILE = $(TERRAFORM_ENVS_DIR)/$(ENV).backend.conf
TFVARS_FILE = $(TERRAFORM_ENVS_DIR)/$(ENV).tfvars

# Ensure the backend config and tfvars files exist
ifeq ("$(wildcard $(TERRAFORM_DIR)/$(BACKEND_CONFIG_FILE))","")
    $(error Backend config file '$(BACKEND_CONFIG_FILE)' not found)
endif

ifeq ("$(wildcard $(TERRAFORM_DIR)/$(TFVARS_FILE))","")
    $(error TFVARS file '$(TFVARS_FILE)' not found)
endif

test:
	@echo "Testing with environment: $(ENV)"
	@echo "Backend config file: $(BACKEND_CONFIG_FILE)"
	@echo "TFVARS file: $(TFVARS_FILE)"
	@echo "Terraform directory: $(TERRAFORM_DIR)"

# Terraform init
init:
	@echo "Initializing Terraform with backend configuration from $(BACKEND_CONFIG_FILE)..."
	cd $(TERRAFORM_DIR) && terraform init -backend-config=$(BACKEND_CONFIG_FILE)

# Terraform plan
plan:
	@echo "Running Terraform plan with variables from $(TFVARS_FILE)..."
	cd $(TERRAFORM_DIR) && terraform plan -var-file=$(TFVARS_FILE)

# Terraform apply
apply:
	@echo "Applying Terraform configuration with variables from $(TFVARS_FILE)..."
	cd $(TERRAFORM_DIR) && terraform apply -var-file=$(TFVARS_FILE) -auto-approve

# Terraform destroy
destroy:
	@echo "Destroying Terraform-managed infrastructure with variables from $(TFVARS_FILE)..."
	cd $(TERRAFORM_DIR) && terraform destroy -var-file=$(TFVARS_FILE) -auto-approve

.PHONY: init plan apply destroy