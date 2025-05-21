grammar FlowChart

entry FCModule:
    ('// generated at' date=STRING)?
    'chart' 'FlowChart;'
    'package' packageName=STRING ';'
    'name' name=ID ';'
    statements+=Statement*;

Statement:
    ProcessStatement | 
    IfStatement | 
    ElseStatement | 
    LoopStatement | 
    // GroupStatement | 
    // WhileStatement | 
    DoStatement | 
    // ForStatement | 
    SwitchStatement | 
    CaseStatement |
    DefaultStatement |
    BreakStatement |
    ContinueStatement;

ProcessStatement:
    'process' code=CODE_BLOCK ';';

IfStatement:
    'if' '(' condition=CODE_BLOCK ')' '{'
        statements+=Statement*
    '}';

ElseStatement:
    'else' '{'
        statements+=Statement*
    '}';

LoopStatement:
    'loop' '(' condition=CODE_BLOCK ')' '{'
        statements+=Statement*
    '}';

// GroupStatement:
//     'group' name=ID '{'
//         statements+=Statement*
//     '}';

// WhileStatement:
//     'while' '(' condition=CODE_BLOCK ')' '{'
//         statements+=Statement*
//     '}';

DoStatement:
    'do' '{'
        statements+=Statement*
    '}' 'while' '(' condition=CODE_BLOCK ')' ';';

// ForStatement:
//     'for' '(' init=CODE_BLOCK ';' condition=CODE_BLOCK ';' update=CODE_BLOCK ')' '{'
//         statements+=Statement*
//     '}';

SwitchStatement:
    'switch' '(' condition=CODE_BLOCK ')' '{'
        statements+=Statement*
    '}';

CaseStatement:
    'case' value=CODE_BLOCK ':' ('{'
        statements+=Statement*
    '}')?;

DefaultStatement:
    'default' ':' ('{'
        statements+=Statement*
    '}')?;

BreakStatement:
    {infer BreakStatement} 'break' ';';

ContinueStatement:
    {infer ContinueStatement} 'continue' ';';

terminal CODE_BLOCK: /'''([^']|'[^']|''[^'])*'''/;
hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal STRING: /[_a-zA-Z][\w_]*(\.[_a-zA-Z][\w_]*)*|"[^"]*"/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/; 