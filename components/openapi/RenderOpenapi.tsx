import React     from 'react';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export const Openapi = (options: { url: String }) => <SwaggerUI url={options.url}/>;
