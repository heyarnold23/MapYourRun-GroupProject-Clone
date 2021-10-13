from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', age=25, weight=180, height="5'10")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', age=30, weight=190, height="5'11")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', age=35, weight=200, height="6'00")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    marnie.friends_association.append(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
