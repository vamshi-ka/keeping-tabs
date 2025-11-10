#!/bin/bash

# Sign and build Firefox extension
# Usage: ./sign.sh

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Signing Keeping Tabs extension...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo "Please create a .env file with your Mozilla API credentials:"
    echo "WEB_EXT_API_KEY=your-key"
    echo "WEB_EXT_API_SECRET=your-secret"
    exit 1
fi

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

# Run web-ext sign
echo -e "${BLUE}📦 Building and signing...${NC}"
web-ext sign \
    --api-key="$WEB_EXT_API_KEY" \
    --api-secret="$WEB_EXT_API_SECRET" \
    --channel=unlisted

# Check if signing was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Extension signed successfully!${NC}"
    echo -e "${GREEN}📂 Signed .xpi file is in: web-ext-artifacts/${NC}"

    # Find the latest .xpi file
    LATEST_XPI=$(ls -t web-ext-artifacts/*.xpi | head -1)
    echo -e "${GREEN}📦 Latest build: $LATEST_XPI${NC}"
    echo ""
    echo -e "${BLUE}To install:${NC}"
    echo "1. Open Firefox"
    echo "2. Go to about:addons"
    echo "3. Click the gear icon (⚙️)"
    echo "4. Select 'Install Add-on From File...'"
    echo "5. Navigate to: $LATEST_XPI"
else
    echo -e "${RED}❌ Signing failed!${NC}"
    exit 1
fi
