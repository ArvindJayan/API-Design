import prisma from '../modules/db';

export const getUpdatePoint = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const updatePoint = await prisma.updatePoint.findUnique({
        where: {
            id: id
        }
    });

    if (!updatePoint) {
        return res.status(404).json({ message: 'UpdatePoint not found' });
    }

    res.json({ data: updatePoint });
}

export const getUpdatePoints = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: {
                include: {
                    updates: {
                        include: {
                            updatePoints: true
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updates = user.products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints];
    }, []);

    res.json({ data: updatePoints });

}

export const createUpdatePoint = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.body.updateId
        }
    });

    if (!update) {
        return res.status(404).json({ message: 'Update not found' });
    }

    const updatePoint = await prisma.updatePoint.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            update: { connect: { id: update.id } },
        }
    });

    res.json({ data: updatePoint });
}

export const updateUpdatePoint = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id || !name || !description) {
        return res.status(400).json({ message: 'ID, name, and description are required' });
    }

    const updatePoint = await prisma.updatePoint.findUnique({
        where: { id }
    });

    if (!updatePoint) {
        return res.status(404).json({ message: 'Update point not found' });
    }

    const update = await prisma.update.findUnique({
        where: { id: updatePoint.updateId },
        include: {
            product: {
                select: { belongsToId: true }
            }
        }
    });

    if (update.product.belongsToId !== req.user.id) {
        return res.status(403).json({ message: 'You do not have permission to update this Update point' });
    }

    const updated = await prisma.updatePoint.update({
        where: { id },
        data: { name, description }
    });

    res.json({ data: updated });
}

export const deleteUpdatePoint = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: {
                include: {
                    updatePoints: true
                }
            }
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const updatePoints = updates.reduce((allUpdatePoints, update) => {
        return [...allUpdatePoints, ...update.updatePoints];
    }, []);

    const match = updatePoints.find(updatePoint => updatePoint.id === req.params.id);

    if (!match) {
        return res.status(404).json({ message: 'UpdatePoint not found' });
    }

    const deleted = await prisma.updatePoint.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: deleted });
}