module.exports = function(db){
    db['book'].belongsTo(db['user'], {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
}