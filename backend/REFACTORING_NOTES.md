# Tasks API - Refactoring Exercise

This document outlines the intentional code quality issues in the Tasks API (`src/routes/tasks.ts`) that students should identify and refactor.

## SOLID Principle Violations

### 1. Single Responsibility Principle (SRP)
- **Route handlers do too much**: Each endpoint mixes routing, validation, business logic, and data persistence
- **Data storage in route file**: In-memory storage (`tasks` array) should be in a separate repository/service layer
- **Validation logic embedded**: Validation is duplicated across multiple endpoints instead of being centralized

### 2. Open/Closed Principle (OCP)
- **Magic strings**: Status values (`'todo'`, `'in-progress'`, `'done'`) and priority values (`'low'`, `'medium'`, `'high'`) are hardcoded throughout
- **No extensibility**: Adding new status types or priorities requires modifying multiple functions
- **Validation arrays recreated**: Valid status/priority arrays are recreated in multiple places

### 3. Dependency Inversion Principle (DIP)
- **Direct dependency on data structure**: Route handlers directly manipulate the `tasks` array
- **No abstraction layer**: No interface or abstract class for data operations
- **Tight coupling**: Business logic is tightly coupled to Express request/response objects

## Code Smells

### 1. Code Duplication (DRY Violations)
- **Validation logic repeated**: The same validation code appears in POST, PUT, and PATCH endpoints
- **ID validation duplicated**: Parsing and validating task IDs is repeated in every endpoint that uses `:id`
- **Error handling patterns**: Similar error responses are constructed multiple times
- **Status/priority validation**: Same validation logic appears in 3+ places

### 2. Long Functions
- **PUT endpoint**: 60+ lines doing validation, business logic, and response formatting
- **PATCH endpoint**: Nearly identical to PUT with minor differences
- **POST endpoint**: Combines validation, defaults, business logic, and persistence

### 3. Inconsistent Patterns
- **Response formats vary**: Sometimes return objects, sometimes arrays, sometimes with wrapper objects
- **Status codes inconsistent**: Mix of 200 and 201 for success
- **Error message formats**: Some detailed, some generic

### 4. Poor Type Safety
- **`any` type used**: The `tasks` array uses `any[]` instead of a proper interface
- **No type definitions**: Task structure is implicit, not explicitly defined

### 5. Missing Abstractions
- **No service layer**: Business logic should be in a separate service
- **No repository pattern**: Data access should be abstracted
- **No middleware**: Validation and ID parsing should be middleware
- **No constants file**: Magic strings should be in a constants file

## Suggested Refactoring Steps

### Phase 1: Extract Types and Constants
1. Create a `Task` interface in `types/index.ts`
2. Create enums for `TaskStatus` and `TaskPriority`
3. Move magic strings to constants

### Phase 2: Create Service Layer
1. Create `services/taskService.ts` with business logic
2. Extract validation into separate validator functions
3. Move data operations to service methods

### Phase 3: Create Repository Layer
1. Create `repositories/taskRepository.ts` for data access
2. Define repository interface
3. Implement in-memory repository (can be swapped for database later)

### Phase 4: Refactor Routes
1. Slim down route handlers to just routing
2. Use service layer for business logic
3. Create validation middleware
4. Create ID parsing middleware

### Phase 5: Improve Error Handling
1. Create custom error classes
2. Implement error handling middleware
3. Standardize error response format

### Phase 6: Add Documentation
1. Add JSDoc comments
2. Document API endpoints
3. Add OpenAPI/Swagger specification

## Testing Considerations

All 36 tests currently pass. After refactoring:
- Tests should still pass without modification
- Consider adding unit tests for service layer
- Consider adding unit tests for repository layer
- Integration tests (current tests) should remain green

## Learning Objectives

Students should learn to:
1. **Use AI to identify code quality issues**: Practice prompting AI to analyze code for SOLID violations, code smells, and anti-patterns
2. **Collaborate with AI on refactoring strategy**: Learn to ask AI for refactoring suggestions and evaluate proposed solutions
3. **Iterative refactoring with AI assistance**: Use AI to implement refactoring steps incrementally while maintaining test coverage
4. **Verify AI-generated refactorings**: Understand how to validate that AI refactorings preserve functionality using existing tests
5. **Guide AI with context**: Practice providing AI with specific constraints (e.g., "maintain backward compatibility", "keep tests passing")
6. **Learn from AI explanations**: Use AI to explain why certain patterns are problematic and how refactored code improves maintainability
7. **AI-assisted code review**: Practice having AI review code changes and suggest improvements before finalizing refactorings
