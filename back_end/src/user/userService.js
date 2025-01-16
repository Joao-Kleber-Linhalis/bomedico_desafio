import userModel from './userModel.js';
import PDFDocument from 'pdfkit';

export async function findAllDBService() {
    try {
        const users = await userModel.find({});
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function findByIdDBService(id) {
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error('Error finding user for id: ' + id, error);
        return false;
    }
}

export async function createUserDBService(userDetails) {
    try {
        const userModelData = new userModel({
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            state: userDetails.state,
            city: userDetails.city,
            email: userDetails.email,
            phone: userDetails.phone,
        });

        await userModelData.save();
        return true; // Sucesso
    } catch (error) {
        console.error('Error saving user:', error);
        return false; // Falha
    }
}

export async function updateUserDBService(id, userDetails) {
    try {
        userDetails.id = id;
        await userModel.findByIdAndUpdate(id, userDetails);
        return true;
    } catch (error) {
        console.error('Error updating user:', error);
        return false; // Falha
    }
}
export async function deleteUserDBService(id) {
    try {
        console.log(id);
        await userModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false; // Falha
    }
}

async function _generateReport(camp) {
    try {
        const report = await userModel.aggregate([
            { $group: { _id: "$" + camp, count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        return report;
    } catch (error) {
        console.error('Error generating report data:', error);
        throw error;
    }
}

export async function generatePDFReport(camp, res) {
    try {
        const report = await _generateReport(camp);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="report.pdf"');

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(18).text('Relatório de Usuários', { align: 'center' });
        doc.moveDown();

        if (camp === "city" || camp === "state") {
            const header = camp === "city" ? 'Por Cidade:' : 'Por Estado:';
            doc.fontSize(14).text(header, { stroke: true });
            doc.moveDown();

            const columnWidths = { label: 300, count: 100 };
            const tableWidth = columnWidths.label + columnWidths.count;
            const pageWidth = doc.page.width;
            const lineX = (pageWidth - tableWidth) / 2
            const startX = 50;
            let currentY = doc.y;

            doc
                .fontSize(12)
                .text('Nome', startX, currentY, { width: columnWidths.label, align: 'center' })
                .text('Total', startX + columnWidths.label, currentY, { width: columnWidths.count, align: 'center' });

            doc.moveTo(lineX, currentY + 15).lineTo(lineX + columnWidths.label + columnWidths.count, currentY + 15).stroke();
            currentY += 20;

            report.forEach((item) => {
                doc
                    .fontSize(10)
                    .text(item._id || 'N/A', startX, currentY, { width: columnWidths.label, align: 'center' })
                    .text(item.count.toString(), startX + columnWidths.label, currentY, { width: columnWidths.count, align: 'center' });
                currentY += 15;
            });
        } else {
            throw new Error(`Campo inválido para relatório: ${camp}`);
        }

        doc.end();
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).send('Erro ao gerar relatório');
    }
}

